import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_PHOTOS = gql`
  query {
    Get {
      Photo {
        image
      }
    }
  }
`;

const PhotoGrid = () => {
  const { loading, error, data } = useQuery(GET_PHOTOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const photos = data.Get.Photo;

  return (
    <div className="grid grid-cols-4 gap-4">
      {photos.map((photo, index) => (
        <img
          key={index}
          src={`data:image/jpeg;base64,${photo.image}`}
          alt={`Photo ${index}`}
        />
      ))}
    </div>
  );
};

export default PhotoGrid;
