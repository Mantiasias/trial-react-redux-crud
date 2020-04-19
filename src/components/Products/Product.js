import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardBody, CardTitle, ListGroup, ListGroupItem, Button, ButtonGroup } from 'reactstrap'
import moment from 'moment'
const shortDateFormat = 'MM/DD/YYYY';
const longDateFormat = 'MM/DD/YYYY hh:mm a';

const Product = ({ product, onDelete, onUpdate }) => {
  const receiptDate =  product.receiptDate ? moment(new Date(product.receiptDate)).format(shortDateFormat) : '-';
  const expirationDate =  product.expirationDate ? moment(new Date(product.expirationDate)).format(shortDateFormat) : '-';
  const createdAt = product.createdAt ? moment(new Date(product.createdAt)).format(longDateFormat) : '-';

  return (
    <Card>
      <CardBody>
        <CardTitle>{product.name}</CardTitle>
        <CardText>
          <ListGroup>
            <ListGroupItem>Brand: {product.brand}</ListGroupItem>
            <ListGroupItem>Rating: {product.rating}</ListGroupItem>
            <ListGroupItem>Featured: {product.featured ? 'Yes' : 'No'}</ListGroupItem>
            <ListGroupItem>Items In Stock: {product.itemsInStock}</ListGroupItem>
            <ListGroupItem>
              Categories:
              <ul>
                {product.categories.map(category => (
                  <li key={category.id}>{category.name}</li>
                ))}
              </ul>
            </ListGroupItem>
            <ListGroupItem>Receipt Date: {receiptDate}</ListGroupItem>
            <ListGroupItem>Expiration Date: {expirationDate}</ListGroupItem>
            <ListGroupItem>Created At: {createdAt}</ListGroupItem>
          </ListGroup>
        </CardText>
        <ButtonGroup>
          <Button color="primary" onClick={onUpdate}>Update</Button>
          <Button color="danger" onClick={onDelete}>Delete</Button>
        </ButtonGroup>
      </CardBody>
    </Card>
  );
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
