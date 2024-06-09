import LoginComp from '@/Components/LoginComp'
// import AddUserForm from '../Components/AddUserForm';

const HomePage = () => {
  return (
    <div className="flex items-center flex-col">
      {/* <h1>Bästa sidan</h1> */}
      <LoginComp />
      <div>Användare: <strong>hej</strong> Password: <strong>pw</strong></div>
    </div>
  )
}

export default HomePage
