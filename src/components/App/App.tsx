import Section from "../Section/Section";
import Container from "../Container/Container";
import { getPhotos } from "../../services/photos";
import toast from "react-hot-toast";

const handleSearch = async (query: string) =>{
  try{
    const photos = await getPhotos(query);
    if(photos.length === 0){
      toast.error("Error, no photos");
    }
  } catch{

  }
}

export default function App() {
  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSearch}/>
          {/* Компоненти застосунку */}</Container>
        Home page
      </Section>
    </>
  );
}
