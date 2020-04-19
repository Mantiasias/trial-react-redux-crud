import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, CustomInput, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { clamp, head, inRange } from 'lodash'
import moment from 'moment'

const ProductForm = ({ productData, mode, formCallback, categoriesById }) => {

  const isUpdateMode = mode === 'update'

  const [isNameValid, setIsNameValid] = useState(true)
  const [isExpirationDateValid, setIsExpirationDateValid] = useState(true)
  const [isSelectedCategoriesValid, setIsSelectedCategoriesValid] = useState(true)

  const [name, setName] = useState(isUpdateMode ? productData.name : 'Your Product Name')
  const [brand, setBrand] = useState(isUpdateMode ? productData.brand : 'Your Product Brand')
  const [rating, setRating] = useState(isUpdateMode ? productData.rating : 0)
  const [itemsInStock, setItemsInStock] = useState(isUpdateMode ? productData.itemsInStock : 0)
  const [selectedCategories, setSelectedCategories] = useState(isUpdateMode ? productData.categories : head(categoriesById))
  const [featured, setFeatured] = useState(isUpdateMode ? productData.featured : false)
  const [expirationDate, setExpirationDate] = useState(isUpdateMode ? productData.expirationDate : null)
  const [receiptDate, setReceiptDate] = useState(isUpdateMode ? productData.expirationDate : null)

  const validateForm = () => {
    if (typeof name !== 'string' || name.length > 50 || name.length === 0) {
      setIsNameValid(false)
    } else {
      setIsNameValid(true)
    }
    if (moment(expirationDate).diff(moment(), 'days') <= 30) {
      setIsExpirationDateValid(false)
    } else {
      setIsExpirationDateValid(true)
    }
    if (inRange(selectedCategories.length, 1, 5)) {
      setIsSelectedCategoriesValid(true)
    } else {
      setIsSelectedCategoriesValid(false)
    }
    return isNameValid && setIsSelectedCategoriesValid && isExpirationDateValid
  }

  const validationFormCallback = useCallback(validateForm, [name, expirationDate, selectedCategories])

  useEffect(() => {
    validationFormCallback()
  }, [validationFormCallback])

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
        setFeatured(value > 8)
        break
      }
      case 'itemsInStock': {
        setItemsInStock(clamp(value.replace(/^0+/, ''), 0, 1000))
        break
      }
      case 'categories': {
        const selectedCategoryOptions = Array.apply(null, value)
            .filter(option => option.selected)
            .map(option => option.value)

        setSelectedCategories(selectedCategoryOptions)
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
      default:
        break;
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
      categories: selectedCategories,
    }
    formCallback(productDataToSend)
  }

  return (
    <Form>
      <FormGroup row>
        <Label for="name">Product Name</Label>
        <Input name="name" invalid={!isNameValid} type='text' onChange={(e) => updateField('name', e.target.value)}
               value={name} />
        <FormFeedback>Name is required, length not greater than 200</FormFeedback>
      </FormGroup>

      <FormGroup row>
        <Label for="brand">Product Brand</Label>
        <Input name="brand" type='text' onChange={(e) => updateField('brand', e.target.value)}
               value={brand} />
      </FormGroup>

      <Row form>
        <Col>
          <FormGroup row>
            <Label for="rating">Product Rating</Label>
            <Input id="rating" name="rating" max="10" min="0" step="1" type='number'
                   onChange={(e) => updateField('rating', e.target.value)} value={Number(rating).toString()} />
            <FormFeedback>Rating should be Number between 0 and 10</FormFeedback>
          </FormGroup>
          <FormGroup row>
            <CustomInput
              id="featured"
              label="Featured"
              type="checkbox"
              disabled
              onChange={() => updateField('featured', !featured)}
              checked={!!featured}
              value={!!featured}
            />
          </FormGroup>
        </Col>
      </Row>

      <FormGroup row>
        <Label for="itemsInStock">Items in Stock</Label>
        <Input
          name="itemsInStock"
          type='number'
          onChange={e => updateField('itemsInStock', e.target.value)}
          value={Number(itemsInStock).toString()}
        />
      </FormGroup>

      <FormGroup row>
        <Label for="categories">Product Categories</Label>
        <Input
          invalid={!isSelectedCategoriesValid}
          name="categories"
          type='select'
          multiple
          onChange={e => updateField('categories', e.target.options)}
          value={selectedCategories}
        >
          {categoriesById.map((categoryItem) =>
            <option
              key={categoryItem[1].id}
              value={categoryItem[1].id}
            >
              {categoryItem[1].name}
            </option>
          )}
        </Input>
        <FormFeedback>Product should have from 1 to 5 categories</FormFeedback>
      </FormGroup>

      <FormGroup row>
        <Label for="receiptDate">Receipt Date</Label>
        <Input name="receiptDate" type='date' onChange={(e) => updateField('receiptDate', e.target.value)}
               value={receiptDate === null ? '' : receiptDate} />
      </FormGroup>

      <FormGroup row>
        <Label for="expirationDate">Expiration Date</Label>
        <Input name="expirationDate" invalid={!isExpirationDateValid} type='date'
               onChange={(e) => updateField('expirationDate', e.target.value)}
               value={expirationDate === null ? '' : expirationDate} />
        <FormFeedback>Expiration date should expire not less than 30 days since now</FormFeedback>
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
