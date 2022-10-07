import React from 'react'

import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImageDataService from '../Service/ImageDataService';

class ListingCard extends React.Component {
  
  constructor(props) {
    super(props);
    console.log("listing: ")
    console.log(props.listing)
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
        <Card.Img style={{height: "17.852rem", width: "17.852rem", "objectFit": "cover"}} variant="top" src={ this.state.img } alt="img" />
        <Card.Body>
          <Card.Title>{ this.state.listing.title }</Card.Title>
          <Card.Text>
            Seller: { this.state.listing.account.firstName } { this.state.listing.account.lastName.charAt(0) }.
          </Card.Text>
          <Card.Text>
            Asking price: ${ this.state.listing.price }
          </Card.Text>
          <Link to={{pathname:"/listingdetails/" + this.state.listing.listingId}}>
            <Button variant="primary">Details</Button>
          </Link>
        </Card.Body>
      </Card>
    )
  }
}

export default ListingCard