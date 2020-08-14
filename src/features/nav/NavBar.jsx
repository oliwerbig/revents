import React from "react"
import { Menu, Container, Button } from "semantic-ui-react"
import { NavLink, useHistory } from "react-router-dom"
import SignedInMenu from "./SignedInMenu"
import SignedOutMenu from "./SignedOutMenu"
import { useSelector } from 'react-redux'

export default function NavBar({ setFormOpen }) {
	const { authenticated } = useSelector(state => state.auth)

	return (
		<Menu inverted fixed='top'>
			<Container>
				<Menu.Item as={NavLink} exact to='/' header>
					<img
						src='/assets/logo.png'
						alt='logo'
						style={{ marginRight: 15 }}
					/>
					Re-vents
				</Menu.Item>
				<Menu.Item as={NavLink} exact to='/events' name='Events' />
				<Menu.Item as={NavLink} exact to='/sandbox' name='Sandbox' />
				{authenticated ? (
					<SignedInMenu />
				) : (
					<SignedOutMenu />
				)}
			</Container>
		</Menu>
	)
}
