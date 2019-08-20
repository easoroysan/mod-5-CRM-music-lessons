import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

function Default(){
    return(
        <Header icon as='h2' textAlign='center'>
            <Icon name='bug' circular/>
            <Header.Content>Uh oh...404</Header.Content>
            <Header.Subheader>This webpage does not exit. You may have the wrong url.</Header.Subheader>
        </Header>
    )
}

export default Default