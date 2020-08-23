import React from "react"
import EventDashboard from "../../features/events/eventDashboard/EventDashboard"
import NavBar from "../../features/nav/NavBar"
import { Container } from "semantic-ui-react"
import { Route, Switch, useLocation } from "react-router-dom"
import HomePage from "../../features/home/HomePage"
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage"
import EventForm from "../../features/events/eventForm/EventForm"
import Sandbox from '../../features/sandbox/Sandbox'
import ModalManager from '../common/modals/ModalManager'
import { ToastContainer } from "react-toastify"
import ErrorComponent from '../common/errors/ErrorComponent'
import AccountPage from '../../features/auth/AccountPage'
import { useSelector } from 'react-redux'
import LoadingComponent from "./LoadingComponent"
import ProfilePage from '../../features/profiles/profilePage/ProfilePage'

export default function App() {
	const { key } = useLocation()
	const { initialised } = useSelector(state => state.async)

	if (!initialised) return <LoadingComponent content='Loading app...' />

	return (
		<>
			<ModalManager />
			<ToastContainer position='bottom-right' hideProgressBar />
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route>
					<NavBar />
					<Container className='main'>
						<Route exact path='/events' component={EventDashboard} />
						<Route exact path='/sandbox' component={Sandbox} />
						<Route exact path='/events/:id' component={EventDetailedPage} />
						<Route exact path={['/createEvent', '/manage/:id']} component={EventForm} key={key} />
						<Route exact path='/account' component={AccountPage} />
						<Route exact path='/profile/:id' component={ProfilePage} />
						<Route exact path='/error' component={ErrorComponent} />
					</Container>
				</Route>
			</Switch>
		</>
	)
}
