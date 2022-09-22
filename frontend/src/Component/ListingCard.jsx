import React from 'react'

import { Card, Button } from 'react-bootstrap';
import AccountService from '../Service/AccountService';
import ImageDataService from '../Service/ImageDataService';

class ListingCard extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      listing: props.listing,
      img: [],
    }
  }

  componentDidMount() {
    ImageDataService.getImage(this.state.listing.images[0].imageId).then((Response) => {
      this.setState({ img: Response })
    })
  }

  render() {

    return (
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img style={{height: "17.852rem", width: "17.852rem", "object-fit": "cover"}} variant="top" src={ this.state.img } alt="img" />
        <Card.Body>
          <Card.Title>{ this.state.listing.title }</Card.Title>
          <Card.Text>
            Seller: { this.state.listing.account.firstName } { this.state.listing.account.lastName.charAt(0) }.
          </Card.Text>
          <Card.Text>
            Asking price: ${ this.state.listing.price }
          </Card.Text>

          <Button variant="primary">Details</Button>
        </Card.Body>
      </Card>
    )
  }
}

export default ListingCard