import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { clamp } from 'lodash'
import moment from 'moment'

const ProductForm = ({ productData, mode, formCallback }) => {

  const isUpdateMode = mode === 'update'

  const [isNameValid, setIsNameValid] = useState(true)
  const [isExpirationDateValid, setIsExpirationDateValid] = useState(true)
  const [name, setName] = useState(isUpdateMode ? productData.name : '')
  const [brand, setBrand] = useState(isUpdateMode ? productData.brand : '')
  const [rating, setRating] = useState(isUpdateMode ? productData.rating : 0)
  const [itemsInStock, setItemsInStock] = useState(isUpdateMode ? productData.itemsInStock : 0)
  const [featured, setFeatured] = useState(isUpdateMode ? productData.featured : false)
  const [expirationDate, setExpirationDate] = useState(isUpdateMode ? productData.expirationDate : null)
  const [receiptDate, setReceiptDate] = useState(isUpdateMode ? productData.expirationDate : null)

  const validateForm = () => {
    if (typeof name !== 'string' || name.length > 50 || name.length === 0) {
      setIsNameValid(false)
      return false
    } else {
      setIsNameValid(true)
    }
    if (moment(expirationDate).diff(moment(), 'days') <= 30) {
      setIsExpirationDateValid(false)
      return false
    } else {
      setIsExpirationDateValid(true)
    }
    return true
  }

  useEffect(() => {
    // Update the document title using the browser API
    validateForm()
  }, [name, expirationDate])

  const updateField = (key, value) => {
    switch (key) {
      case 'name': {
        setName(value && value.trim())
        break
      }
      case 'brand': {
        setBrand(value.trim())
        break
      }
      case 'rating': {
        setRating(clamp(value.replace(/^0+/, ''), 0, 10))
        if (value > 8) {
          setFeatured(true)
        }
        break
      }
      case 'itemsInStock': {
        setItemsInStock(clamp(value.replace(/^0+/, ''), 0, 1000))
        break
      }
      case 'featured': {
        setFeatured(value)
        break
      }
      case 'expirationDate': {
        setExpirationDate(value)
        break
      }
      case 'receiptDate': {
        setReceiptDate(value)
        break
      }
    }
  }

  const submitForm = () => {
    if (!validateForm()) {
      return
    }
    const productDataToSend = {
      id: isUpdateMode ? productData.id : null,
      name,
      rating,
      itemsInStock,
      featured,
      expirationDate,
      receiptDate,
      createdDate: isUpdateMode ? productData.createdDate : moment(),
    }
    formCallback(productDataToSend)
  }

  return (
    <Form>
      <FormGroup>
        <Label for="name">Product Name</Label>
        <Input name="name" invalid={!isNameValid} type='text' onChange={(e) => updateField('name', e.target.value)}
               value={name} />
        <FormFeedback>Name is required, length not greater than 200</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label for="brand">Product Brand</Label>
        <Input name="brand" type='text' onChange={(e) => updateField('brand', e.target.value)}
               value={brand} />
      </FormGroup>

      <FormGroup>
        <Label for="rating">Product Rating</Label>
        <Input name="rating" max="10" min="0" step="1" type='number'
               onChange={(e) => updateField('rating', e.target.value)} value={Number(rating).toString()} />
        <FormFeedback>Rating should be Number between 0 and 10</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label for="itemsInStock">Items in Stock</Label>
        <Input name="itemsInStock" type='number' onChange={(e) => updateField('itemsInStock', e.target.value)}
               value={Number(itemsInStock).toString()} />
      </FormGroup>

      <FormGroup>
        <Label for="receiptDate">Receipt Date</Label>
        <Input name="receiptDate" type='date' onChange={(e) => updateField('receiptDate', e.target.value)}
               value={receiptDate === null ? '' : receiptDate} />
      </FormGroup>

      <FormGroup>
        <Label for="expirationDate">Expiration Date</Label>
        <Input name="expirationDate" invalid={!isExpirationDateValid} type='date'
               onChange={(e) => updateField('expirationDate', e.target.value)}
               value={expirationDate === null ? '' : expirationDate} />
        <FormFeedback>Expiration date should expire not less than 30 days since now</FormFeedback>
      </FormGroup>

      <FormGroup check>
        <Label check>
          <Input type="checkbox" onChange={() => updateField('featured', !featured)} checked={!!featured}
                 value={!!featured} />
          Featured
        </Label>
      </FormGroup>

      <Button color="primary" onClick={() => submitForm(mode)}>{isUpdateMode ? 'Save' : 'Create'}</Button>
    </Form>
  )
}

ProductForm.propTypes = {
  productData: PropTypes.object,
  mode: PropTypes.string.isRequired,
  formCallback: PropTypes.func.isRequired,
}

export default ProductForm
