import Section from "../Section/Section";
import Container from "../Container/Container";
import { getPhotos } from "../../services/photos";
import toast from "react-hot-toast";
import { useState } from "react";
import { Photo } from "../../types/photo";
import Form from "../Form/Form";

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
  const[photos, setPhotos] = useState<Photo[]>([])
  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSearch}/>

          

        </Container>
      </Section>
    </>
  );
}
