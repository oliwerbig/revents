import React, { useState } from "react"
import { Segment, Header, Form, Button } from "semantic-ui-react"
import cuid from "cuid"

export default function EventForm({
	setFormOpen,
	setEvents,
	createEvent,
	selectedEvent,
	updateEvent,
}) {
	const initialValues = selectedEvent ?? {
		title: "",
		category: "",
		description: "",
		city: "",
		venue: "",
		date: "",
	}

	const [values, setValues] = useState(initialValues)

	function handleFormSubmit() {
		selectedEvent
			? updateEvent({ ...selectedEvent, ...values })
			: createEvent({
					...values,
					id: cuid(),
					hostedBy: "Bob",
					attendees: [],
					hostPhotoURL: "/assets/user.png",
			  })
		setFormOpen(false)
	}

	function handleInputChange(e) {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}

	return (
		<Segment clearing>
			<Header content={selectedEvent ? "Edit event" : "Create event"} />
			<Form onSubmit={handleFormSubmit}>
				<Form.Field>
					<input
						type='text'
						placeholder='Event title'
						name='title'
						value={values.title}
						onChange={handleInputChange}
					/>
				</Form.Field>
				<Form.Field>
					<input
						type='text'
						placeholder='Category'
						name='category'
						value={values.category}
						onChange={handleInputChange}
					/>
				</Form.Field>
				<Form.Field>
					<input
						type='text'
						placeholder='Description'
						name='description'
						value={values.description}
						onChange={handleInputChange}
					/>
				</Form.Field>
				<Form.Field>
					<input
						type='text'
						placeholder='City'
						name='city'
						value={values.city}
						onChange={handleInputChange}
					/>
				</Form.Field>
				<Form.Field>
					<input
						type='text'
						placeholder='Venue'
						name='venue'
						value={values.venue}
						onChange={handleInputChange}
					/>
				</Form.Field>
				<Form.Field>
					<input
						type='date'
						placeholder='Date'
						name='date'
						value={values.date}
						onChange={handleInputChange}
					/>
				</Form.Field>
				<Button
					type='submit'
					floated='right'
					positive
					content='Submit'
				/>
				<Button
					onClick={() => setFormOpen(false)}
					type='button'
					floated='right'
					content='Cancel'
				/>
			</Form>
		</Segment>
	)
}
