import React from 'react';
import { Container } from 'react-bootstrap';
import ListingService from '../Service/ListingService';
import ListingCard from './ListingCard';

class Listings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listings: []
        }
    }

    componentDidMount() {
        ListingService.getAll().then((Response) => {
            this.setState({ listings: Response.data });
        });
    }

    render() {
        return(
            // <div style={{"background-color": "lightgrey", "display": "flex", "flexDirection": "row", "height": "100%"}}>
            <Container className="container-fluid mt-4" style={{"backgroundColor": "lightgrey", "display": "flex", "flexDirection": "row"}}>
                {
                    this.state.listings.map(
                        l => l.isSold ? 0 :
                        <div key={ l.listingId }>
                            <ListingCard listing={ l } />
                        </div>
                    )
                }
            </Container>    
            // </div>
        )
    }
}

export default Listings;