type Result = {
    pageid: string,
    title: string,
    extract: string,
    thumbnail?: {
        source: string,
        width: number,
        height: number,
    }
}

type SearchResult = {
    query?: {
        pages?: Result[],
    },
}

type Animal ={
    id: number;
    name: string;
    url: string;
    photos: { medium: string }[];
    from?: string;
}

type AnimalData = Animal[];


type Address = {
    address1: string;
    city: string;
    state: string;
    postcode: string;
}

type Contact = {
    address: Address;
}

type Photo = {
    large: string;
}

type pet = {
    id: number;
    name: string;
    url: string;
    breeds: { primary: string };
    gender: string;
    age: string;
    status: string;
    contact: Contact;
    description: string;
    photos: Photo[];
}
type pet_our = {
  id: number;
  name: string;
  url: string;
  breeds: { primary: string };
  gender: string;
  age: string;
  status: string;
  address: string;
  description: string;
  photo: String;
}

type FavPet = {
    id: number;
    pet: pet_a;
  }
  
  type ContactedPet = {
    id: number;
    pet: pet_a;
  }
  
  type User = {
    id: string;
    name: string;
    email: string;
    bio: string;
    user_img: string;
    phone: string;
    fav_pets: FavPet[];
    contacted_pets: ContactedPet[];
  }

  type pet_a = {
    id: string;
    name: string;
    breed: string;
    ownerId: string;
    photo: string;
    aid: number;
    from: string
  }

  type comment = {
    id: number;
    content: string;
    user: {
      name: string;
      user_img: string;
    };
    petId: number;
    userId: string;
  }


  type cur_pet = {
  id: number;
  name: string;
  breed: string;
  ownerId: string;
  photo: string;
  gender?: string;
  age?: string;
  status?: string;
  address?: string;
  about?: string;
  from?: string;
  url?: string;
  liked?: boolean;
};
