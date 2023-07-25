import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {
  CourseDetailsContainer,
  CourseDetails,
  Image,
  DetailContainer,
  Name,
  Description,
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

class CourseDetailsItem extends Component {
  state = {apiStatus: apiStatusConstant.initial, courseDetails: {}}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
        description: data.course_details.description,
      }
      this.setState({
        courseDetails: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onClickRetryButton = () => {
    this.getCourseDetails()
  }

  renderSuccessView = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails
    return (
      <CourseDetails>
        <Image src={imageUrl} alt={name} />
        <DetailContainer>
          <Name>{name}</Name>
          <Description>{description}</Description>
        </DetailContainer>
      </CourseDetails>
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

  getCourse = () => {
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
    return <CourseDetailsContainer>{this.getCourse()}</CourseDetailsContainer>
  }
}

export default CourseDetailsItem
