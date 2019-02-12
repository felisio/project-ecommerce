import Reset from '../components/Reset'

const ResetPassword = props => (
  <div>
    <Reset resetToken={props.query.resetToken} />
  </div>
)

export default ResetPassword