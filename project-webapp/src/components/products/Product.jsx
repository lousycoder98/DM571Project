import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@mui/material'
import {AddShoppingCart} from '@mui/icons-material'

// import { MyCardContent, MyCardActions } from './styles'
import './styles.css'

const Product = ({product}) => {
    // const classes = styled()

    return(
        <Card /*className={classes.root}*/ >
            <CardMedia /*className={classes.media}*/ image="" title={product.name} />
            <CardContent /*sx={MyCardContent}*/>
                <div className='cardContent' >
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5">
                        {product.price}
                    </Typography>
                    
                </div>
                <Typography variant="h2" color="textSecondary">{product.description}</Typography>
            </CardContent>
            <CardActions disableSpacing /*sx={MyCardActions}*/ className='cardActions'>
                <IconButton aria-label="Add to Cart">
                    <AddShoppingCart />
                </IconButton>
            </CardActions>

        </Card>
    )
}

export default Product