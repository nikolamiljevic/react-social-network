import cuid from 'cuid';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import {createEvent, updateEvent} from '../eventActions'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/commom/form/MyTextInput';
import MyTextArea from '../../../app/commom/form/MyTextarea';

export default function EventForm({match, history }) {

    const dispatch = useDispatch();
    const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id))
   
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
    })

    return (
        <Segment clearing>
           
            <Formik 
                className="ui form"
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => {
                    selectedEvent
                    ? dispatch( updateEvent({...selectedEvent,...values})  )
                    : dispatch( createEvent({...values,id:cuid(),hostedBy:'Mark',attendees:[], hostPhotoURL: '/assets/user.png'}) );
                    history.push('/events')
                }}
            >
                <Form className="ui form">
                    <Header sub color="teal" content="Event details" />
                        <MyTextInput name="title" placeholder="Event title" />
                        <MyTextInput name="category" placeholder="Category" />
                        <MyTextArea name="description" placeholder="Description" rows={3} />
                    <Header sub color="teal" content="Event location details" />
                        <MyTextInput name="city" placeholder="City" />
                        <MyTextInput name="venue" placeholder="Venue" />
                        <MyTextInput name="date" placeholder="Date" type="date"/>

                    <Button type="submit" floated="right" positive content="Submit"/>
                    <Button type="submit" floated="right" content="Cancel" as={Link} to="/events"/>
                </Form> 
            </Formik>
        </Segment>
    )
}
