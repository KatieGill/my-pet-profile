export const PetCard = ({
  petName,
  petImage,
}: {
  petName: string;
  petImage: string;
}) => {
  return (
    <div className="pet-card">
      <h3>{petName}</h3>
      <div className="pet-img">
        <img src={petImage} alt="pet profile picture" />
      </div>
    </div>
  );
};
