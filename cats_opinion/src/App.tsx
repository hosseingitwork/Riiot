import Comment from "./components/Comment"

function App() {

  const people = [
    {
      name:'Hossein',
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&s",
      comment:"Hello I love cats"
    },
    {
      name:'Valeria',
      img:"https://media.istockphoto.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=0&k=20&c=EqR2Lffp4tkIYzpqYh8aYIPRr-gmZliRHRxcQC5yylY=",
      comment:"Cats are annoying"
    },
  ]

  return (
    <div className="p-2">
      {
        people.map(
          (person) => {
            return <Comment name = {person.name} img={person.img} comment={person.comment} />
          }
        )
      }
    </div>
  )
}

export default App
