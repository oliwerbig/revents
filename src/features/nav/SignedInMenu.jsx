import React from "react"
import { Dropdown, Menu, Image, Button } from "semantic-ui-react"
import { Link, NavLink } from "react-router-dom"

export default function SignedInMenu({ signOut }) {
	return (
		<>
			<Menu.Item as={NavLink} exact to='/createEvent'>
				<Button positive inverted content='Create Event' />
			</Menu.Item>
			<Menu.Item position='right'>
				<Image avatar spaced='right' src='/assets/user.png' />
				<Dropdown pointing='top left' text='Bob'>
					<Dropdown.Menu>
						<Dropdown.Item
							as={Link}
							to='/createEvent'
							text='Create Event'
							icon='plus'
						/>
						<Dropdown.Item text='My profile' icon='user' />
						<Dropdown.Item onClick={signOut} text='Sign out' icon='power' />
					</Dropdown.Menu>
				</Dropdown>
			</Menu.Item>
		</>
	)
}
