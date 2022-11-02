import {Grid} from '@mui/material'

import Product from './products/Product'

const products = [
    {id: 1, name: 'Shoes', description: 'Running shoes', price: "1 000$"},
    {id: 2, name: 'MacBook', description: 'Apple laptop', price: "12 500$"},
]

const Products = () => {
  return(
    <main>
      <Grid container justify="center">
        {/* spacing={4} */} 
        {products.map((product) => (
          <Grid key={product.id}>
            {/* item xs={12} sm={6} md={4} lg={3} */}
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
)
}

export default Products;