import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel, Container, Tab, Tabs, Spinner } from 'react-bootstrap';
import ListingService from '../Service/ListingService';

import 'bootstrap/dist/css/bootstrap.min.css';
import ImageDataService from '../Service/ImageDataService';

function ListingDetails(props) {
    const {listingId} = useParams();

    const [listing, setListing] = useState({});
    const [images, setImages] = useState([])
    const [isBusy, setBusy] = useState(true);

    useEffect(() => {
        setBusy(true)
        ListingService.getById(listingId).then((Response) => {
            if (JSON.stringify(listing) === "{}") {
                setListing(Response.data);
                setBusy(false);
            }
        }).then(() => {
            if (JSON.stringify(listing) !== "{}") {
                listing.images.forEach(im => {
                    ImageDataService.getImage(im.imageId).then((Response) => {
                        if (!images.includes(Response)) {
                            setImages(images.concat(Response));
                        }
                    }).catch(e => console.log(e))
                })
            }
            setBusy(false);
        })
    }, [listing, images]);

    return (
        <div>
            { isBusy ? <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner> :
            <Container>
            <Carousel>
                {
                    images.map(
                        im => 
                        <Carousel.Item key={ im }>
                            <img
                            className="d-block w-100"
                            src={ im }
                            alt="listing img"
                            />
                        </Carousel.Item>
                    )
                }
            </Carousel>
            <Tabs
                defaultActiveKey="listing"
                id="uncontrolled-tab-example"
                className="mb-3"
                >
                <Tab eventKey="listing" title={ listing.title }>
                    <p>Asking Price: ${ listing.price }</p>
                    <p>{ listing.description }</p>
                </Tab>
                <Tab eventKey="contact" title="Contact">
                    <p>Seller: { listing.account.firstName } { listing.account.lastName.charAt(0) }.</p>
                    <p>Preferred Contact Method: { listing.account.contactMethod } ({ listing.account.contactMethod === "Text" || listing.account.contactMethod === "Call" ? listing.account.phoneNumber : listing.account.email })</p>
                </Tab>
            </Tabs>
        </Container>
        }
        </div>
    )
}

export default ListingDetails