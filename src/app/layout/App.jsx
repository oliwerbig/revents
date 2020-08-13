import React from "react"
import EventDashboard from "../../features/events/eventDashboard/EventDashboard"
import NavBar from "../../features/nav/NavBar"
import { Container } from "semantic-ui-react"
import { Route, Switch } from "react-router-dom"
import HomePage from "../../features/home/HomePage"
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage"
import EventForm from "../../features/events/eventForm/EventForm"

export default function App() {
	return (
		<Switch>
			<Route exact path='/' component={HomePage} />
			<Route>
				<NavBar />
				<Container className='main'>
					<Route exact path='/events' component={EventDashboard} />
					<Route exact path='/events/:id' component={EventDetailedPage} />
					<Route exact path={['/createEvent', '/manage/:id']} component={EventForm} />
				</Container>
			</Route>
		</Switch>
	)
}
