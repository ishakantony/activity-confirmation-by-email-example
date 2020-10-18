import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '3rem',
  },
  paper: {
    height: 140,
    width: 100,
  },
  card: {
    width: 300,
  },
  control: {
    padding: theme.spacing(2),
    justifyContent: 'center',
  },
}))

export default function Confirm() {
  const router = useRouter()

  const { encryptedText } = router.query

  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const classes = useStyles()

  const handleApprove = async (e) => {
    e.preventDefault()

    try {
      setError('')
      setSuccess('')
      const request = {
        url: '/api/action',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ hash: encryptedText }),
      }

      const response = await axios(request)
      const data = await response.data
      setError('')
      setSuccess(data.message)
    } catch (err) {
      const response = err.response
      const data = response.data
      setSuccess('')
      setError(data.message)
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container className={classes.control}>
              <Grid item>
                {success && <Alert severity="success">{success}</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.control}>
              <Grid item>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Are you sure?
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Minus possimus nisi quam praesentium debitis laudantium.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={handleApprove}
                    >
                      Approve
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
