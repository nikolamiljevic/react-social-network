import cuid from 'cuid';
import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import {createEvent, listenToEvents, updateEvent} from '../eventActions'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/commom/form/MyTextInput';
import MyTextArea from '../../../app/commom/form/MyTextarea';
import MySelectInput from '../../../app/commom/form/MySelectInput';
import { categoryData } from '../../../app/api/categoryOptions'
import MyDateInput from '../../../app/commom/form/MyDateInput';
import { addEventToFirestore, listenToEventFromFirestore, updateEventInFirestore } from '../../../app/firestore/firestoreService';
import useFirestoreDoc from '../../../app/hooks/useFiresetoreDoc';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { toast } from 'react-toastify';

export default function EventForm({match, history }) {

    const dispatch = useDispatch();
    const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id))
    const {loading,error} = useSelector(state => state.async);

    const initialValues = selectedEvent ?? {
        title:'',
        category:'',
        description:'',
        city:'',
        venue:'',
        date:''
    }

    const validationSchema = Yup.object({
        title: Yup.string().required('You must provide a title'),
        category: Yup.string().required('You must provide a category'),
        description: Yup.string().required('You must provide a description'),
        city: Yup.string().required('You must provide a city'),
        venue: Yup.string().required('You must provide a venue'),
        date: Yup.string().required('You must provide a date'),
    });

    
    useFirestoreDoc({
        shouldExecute: !!match.params.id,
        query: () => listenToEventFromFirestore(match.params.id),
        data: event => dispatch(listenToEvents([event])),
        deps: [match.params.id, dispatch]
    });

    if(loading) return <LoadingComponent content="Loading event..."/>
    if(error) return <Redirect to="/error"  />

    return (
        <Segment clearing>
           
            <Formik 
                className="ui form"
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, {setSubmitting}) => {
                    try {
                        selectedEvent
                        ? await updateEventInFirestore(values)
                        : await addEventToFirestore(values)
                        history.push('/events')
                    } catch (error) {
                        toast.error(error.message);
                        setSubmitting(false);
                    }
                }}
            >
                {({isSubmitting, dirty, isValid}) => (
                <Form className="ui form">
                    <Header sub color="teal" content="Event details" />
                        <MyTextInput name="title" placeholder="Event title" />
                        <MySelectInput name="category" placeholder="Category" options={categoryData}/>
                        <MyTextArea name="description" placeholder="Description" rows={3} />
                    <Header sub color="teal" content="Event location details" />
                        <MyTextInput name="city" placeholder="City" />
                        <MyTextInput name="venue" placeholder="Venue" />
                        <MyDateInput
                            name="date" 
                            placeholderText="Event date" 
                            timeFormat="HH:mm" 
                            showTimeSelect 
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm a"
                        />
                    <Button loading={isSubmitting} disabled={!isValid || !dirty || isSubmitting} type="submit" floated="right" positive content="Submit"/>
                    <Button disabled={isSubmitting} type="submit" floated="right" content="Cancel" as={Link} to="/events"/>
                </Form> 
                )}
    
            </Formik>
        </Segment>
    )
}
