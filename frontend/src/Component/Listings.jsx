import React from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
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
            <Container className="container-fluid mt-4" style={{"display": "flex", "flexDirection": "row"}}>
                {
                    localStorage.getItem("jwt") !== "" && localStorage.getItem("jwt") !== null ? (
                        this.state.listings.length > 0 ? (
                            this.state.listings.map(
                                l => l.isSold ? 0 :
                                <div key={ l.listingId }>
                                    <ListingCard listing={ l } />
                                </div>
                            )
                        ) : (
                            <Alert variant="warning">
                                There are currently no listings to display.
                                <Button style={{"marginLeft": "1rem"}} href="/" variant="warning">Reload</Button>
                            </Alert>
                        )
                    ) : (
                        <Alert variant="info">
                            Please sign in to see available listings
                        </Alert>
                    )
                }
            </Container>    
            // </div>
        )
    }
}

export default Listings;