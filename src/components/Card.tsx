import "../styles/card.css"; // CSS 파일을 임포트합니다.

interface CardProps {
  link: string;
  coverImage: string;
  titleImage: string;
  characterImage: string;
  altText: string;
}

const Card = ({
  link,
  coverImage,
  titleImage,
  characterImage,
  altText,
}: CardProps) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="card">
        <div className="wrapper">
          <img src={coverImage} className="cover-image" alt={altText} />
        </div>
        <img src={titleImage} className="title" alt={altText} />
        <img src={characterImage} className="character" alt={altText} />
      </div>
    </a>
  );
};

export default Card;
