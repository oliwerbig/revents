import React, { useEffect } from 'react'
import { Header, Feed } from 'semantic-ui-react'
import { Segment } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserFeedRef, firebaseObjectToArray } from '../../../app/firestore/firebaseService'
import { listenToFeed } from '../../profiles/profileActions'

export default function EventsFeed() {
	const dispatch = useDispatch()
	const { feed } = useSelector((state) => state.profile)

    useEffect(() => {
        getUserFeedRef().on('value', snapshot => {
            if (!snapshot.exists()) {
                return
            }
            const feed = firebaseObjectToArray(snapshot.val()).reverse()
            dispatch(listenToFeed(feed))
        })
        return () => {
            getUserFeedRef().off()
        }
    }, [dispatch])

	return (
		<>
			<Header
				attached
				color='teal'
				icon='newspaper'
				content='News feed'
			/>
			<Segment attached='bottom'>
				<Feed>
					{feed.map(post => (
                        <Feed.Event post={post} key={post.id} />
                    ))}
				</Feed>
			</Segment>
		</>
	)
}
