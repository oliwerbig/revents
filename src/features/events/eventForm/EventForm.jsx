/* global google */
import React from 'react'
import { Segment, Header, Button, Confirm } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listenToEvents } from '../eventActions'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../../app/common/form/MyTextInput'
import MyTextArea from '../../../app/common/form/MyTextArea'
import MySelectInput from '../../../app/common/form/MySelectInput'
import { categoryOptions } from '../../../app/api/categoryOptions'
import MyDateInput from '../../../app/common/form/MyDateInput'
import MyPlaceInput from '../../../app/common/form/MyPlaceInput'
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc'
import {
	listenToEventFromFirestore,
	addEventToFirestore,
} from '../../../app/firestore/firestoreService'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateEventInFirestore } from '../../../app/firestore/firestoreService'
import { cancelEventToggle } from '../../../app/firestore/firestoreService'
import { useState } from 'react'

export default function EventForm({ match, history }) {
	const dispatch = useDispatch()
	const [loadingCancel, setLoadingCancel] = useState(false)
	const [confirmOpen, setConfirmOpen] = useState(false)
	const selectedEvent = useSelector((state) =>
		state.event.events.find((e) => e.id === match.params.id)
	)

	const { loading, error } = useSelector((state) => state.async)

	const initialValues = selectedEvent ?? {
		title: '',
		category: '',
		description: '',
		city: {
			address: '',
			latLng: null,
		},
		venue: {
			address: '',
			latLng: null,
		},
		date: '',
	}

	const validationSchema = Yup.object({
		title: Yup.string().required('Title is required'),
		category: Yup.string().required('Category is required'),
		description: Yup.string().required('Description is required'),
		city: Yup.object().shape({
			address: Yup.string().required('City is required'),
		}),
		venue: Yup.object().shape({
			address: Yup.string().required('Venue is required'),
		}),
		date: Yup.string().required('Date is required'),
	})

	async function handleCancelToggle(event) {
		setConfirmOpen(false)
		setLoadingCancel(false)
		try {
			await cancelEventToggle(event)
			setLoadingCancel(false)
		} catch (error) {
			setLoadingCancel(true)
			toast.error(error.message)
		}
	}

	useFirestoreDoc({
		shouldExecute: !!match.params.id,
		query: () => listenToEventFromFirestore(match.params.id),
		data: (event) => dispatch(listenToEvents([event])),
		deps: [match.params.id, dispatch],
	})

	if (loading) return <LoadingComponent content='Loading event...' />

	if (error) return <Redirect to='/error' />

	return (
		<Segment clearing>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						selectedEvent
							? await updateEventInFirestore(values)
							: await addEventToFirestore(values)
						setSubmitting(false)
						history.push('/events')
					} catch (error) {
						toast.error(error.message)
						setSubmitting(false)
					}
				}}
			>
				{({ isSubmitting, dirty, isValid, values }) => (
					<Form className='ui form'>
						<Header sub color='teal' content='Event details' />
						<MyTextInput name='title' placeholder='Event title' />
						<MySelectInput
							name='category'
							placeholder='Category'
							options={categoryOptions}
						/>
						<MyTextArea
							name='description'
							placeholder='Description'
							rows={3}
						/>
						<Header sub color='teal' content='Event location' />
						<MyPlaceInput name='city' placeholder='City' />
						<MyPlaceInput
							name='venue'
							disabled={!values.city.latLng}
							placeholder='Venue'
							options={{
								location: new google.maps.LatLng(
									values.city.latLng
								),
								radius: 1000,
								type: ['establishment'],
							}}
						/>
						<MyDateInput
							name='date'
							placeholderText='Event date'
							timeFormat='HH:mm'
							showTimeSelect
							timeCaption='time'
							timeIntervals={15}
							dateFormat='MMMM d, yyyy h:mm a'
						/>
						{selectedEvent && (
							<Button
								loading={loadingCancel}
								type='button'
								floated='left'
								color={
									selectedEvent.isCancelled ? 'green' : 'red'
								}
								content={
									selectedEvent.isCancelled
										? 'Reactivate event'
										: 'Cancel Event'
								}
								onClick={() => setConfirmOpen(true)}
							/>
						)}
						<Button
							loading={isSubmitting}
							disabled={!isValid || !dirty || isSubmitting}
							type='submit'
							floated='right'
							positive
							content='Submit'
						/>
						<Button
							disabled={isSubmitting}
							as={Link}
							to='/events'
							type='button'
							floated='right'
							content='Cancel'
						/>
					</Form>
				)}
			</Formik>
			<Confirm
				content={
					selectedEvent?.isCancelled
						? 'This will reactivate the event - are you sure?'
						: 'This will cancel the vent - are you sure?'
				}
				open={confirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={() => handleCancelToggle(selectedEvent)}
			/>
		</Segment>
	)
}
