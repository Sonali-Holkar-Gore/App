import {Link} from 'react-router-dom'

import {CourseItem, CourseName, Logo} from '../../styledComponents'

const Course = props => {
  const {courseDetails} = props
  const {id, logoUrl, name} = courseDetails
  return (
    <Link to={`/courses/${id}`}>
      <CourseItem>
        <Logo src={logoUrl} alt={name} />
        <CourseName>{name}</CourseName>
      </CourseItem>
    </Link>
  )
}

export default Course
