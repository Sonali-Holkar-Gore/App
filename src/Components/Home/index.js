import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Course from '../Course'

import {
  HomePageContainer,
  DetailsContainer,
  Heading,
  CoursesList,
  FailureViewContainer,
  FailureViewImage,
  FailureViewHeading,
  FailureViewDescription,
  Button,
} from '../../styledComponents'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstant.initial, coursesList: []}

  componentDidMount() {
    this.getCoursesList()
  }

  getCoursesList = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
        name: eachCourse.name,
      }))
      this.setState({
        coursesList: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onClickRetryButton = () => {
    this.getCoursesList()
  }

  renderSuccessView = () => {
    const {coursesList} = this.state
    return (
      <DetailsContainer>
        <Heading>Courses</Heading>
        <CoursesList>
          {coursesList.map(eachCourse => (
            <Course courseDetails={eachCourse} key={eachCourse.id} />
          ))}
        </CoursesList>
      </DetailsContainer>
    )
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color=" #475569" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <FailureViewContainer>
      <FailureViewImage
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <FailureViewHeading>Oops! Something Went Wrong</FailureViewHeading>
      <FailureViewDescription>
        We cannot seem to find the page you are looking for.
      </FailureViewDescription>
      <Button type="button" onClick={this.onClickRetryButton}>
        Retry
      </Button>
    </FailureViewContainer>
  )

  getCourses = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'IN_PROGRESS':
        return this.renderLoaderView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <HomePageContainer>{this.getCourses()}</HomePageContainer>
  }
}

export default Home
