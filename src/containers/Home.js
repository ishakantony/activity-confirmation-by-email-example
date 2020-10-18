import {
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import React, { useEffect, useState } from 'react'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

export default function Home() {
  const classes = useStyles()
  const [previewURL, setPreviewURL] = useState(null)
  const [opportunities, setOpportunities] = useState([])
  const [projects, setProjects] = useState([])
  const [openBackdrop, setOpenBackdrop] = useState(false)

  useEffect(() => {
    ;(async () => {
      const response = await fetch('/api/opportunities')
      const data = await response.json()
      setOpportunities(data)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const response = await fetch('/api/projects')
      const data = await response.json()
      setProjects(data)
    })()
  }, [])

  const handleConvertToProject = async (id, title) => {
    try {
      setOpenBackdrop(true)
      setPreviewURL(null)
      const response = await fetch('/api/activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, title }),
      })
      const data = await response.json()
      setPreviewURL(data.previewURL)
    } catch (err) {
      console.error(err)
      setPreviewURL(null)
    } finally {
      setOpenBackdrop(false)
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
                {previewURL && (
                  <Alert severity="warning">
                    To convert opportunity, you must approve the request, check
                    your mailbox{' '}
                    <Link href={previewURL} target="_blank" rel="noreferrer">
                      here
                    </Link>
                    {', '}refresh the page after approval to view latest
                    projects and opportunities.
                  </Alert>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.control}>
              <Grid item>
                <Typography variant="h5">Projects</Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.control} spacing={2}>
              {projects.map((project) => (
                <Grid item key={project.id}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {project.title}
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
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.control}>
              <Grid item>
                <Typography variant="h5">Opportunities</Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.control} spacing={2}>
              {opportunities.map((opportunity) => (
                <Grid item key={opportunity.id}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {opportunity.title}
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
                        onClick={() =>
                          handleConvertToProject(
                            opportunity.id,
                            opportunity.title
                          )
                        }
                      >
                        Convert To Project
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  )
}
