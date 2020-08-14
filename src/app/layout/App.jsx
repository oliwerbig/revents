import React from "react"
import EventDashboard from "../../features/events/eventDashboard/EventDashboard"
import NavBar from "../../features/nav/NavBar"
import { Container, Modal } from "semantic-ui-react"
import { Route, Switch, useLocation } from "react-router-dom"
import HomePage from "../../features/home/HomePage"
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage"
import EventForm from "../../features/events/eventForm/EventForm"
import Sandbox from '../../features/sandbox/Sandbox'
import ModalManager from '../common/modals/ModalManager'

export default function App() {
	const { key } = useLocation()

	return (
		<>
			<ModalManager />
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route>
					<NavBar />
					<Container className='main'>
						<Route exact path='/events' component={EventDashboard} />
						<Route exact path='/sandbox' component={Sandbox} />
						<Route exact path='/events/:id' component={EventDetailedPage} />
						<Route exact path={['/createEvent', '/manage/:id']} component={EventForm} key={key} />
					</Container>
				</Route>
			</Switch>
		</>
	)
}
