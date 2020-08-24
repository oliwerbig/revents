import React from 'react'
import { Dropdown, Menu, Image, Button } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { signOutFirebase } from '../../app/firestore/firebaseService'

export default function SignedInMenu() {
	const { currentUserProfile } = useSelector((state) => state.profile)
	const history = useHistory()

	async function handleSignOut() {
		try {
			history.push('/')
			await signOutFirebase()
		} catch (error) {
			toast.error(error.message)
		}
	}

	return (
		<>
			<Menu.Item as={NavLink} exact to='/createEvent'>
				<Button positive inverted content='Create Event' />
			</Menu.Item>
			<Menu.Item position='right'>
				<Image
					avatar
					spaced='right'
					src={currentUserProfile?.photoURL || '/assets/user.png'}
				/>
				<Dropdown
					pointing='top left'
					text={currentUserProfile?.displayName}
				>
					<Dropdown.Menu>
						<Dropdown.Item
							as={Link}
							to='/createEvent'
							text='Create Event'
							icon='plus'
						/>
						<Dropdown.Item
							as={Link}
							to={`/profile/${currentUserProfile?.id}`}
							text='My profile'
							icon='user'
						/>
						<Dropdown.Item
							text='My account'
							icon='settings'
							as={Link}
							to='/account'
						/>
						<Dropdown.Item
							onClick={handleSignOut}
							text='Sign out'
							icon='power'
						/>
					</Dropdown.Menu>
				</Dropdown>
			</Menu.Item>
		</>
	)
}
