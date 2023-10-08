export interface FilmCardProps {
  title: string;
  imgPath: string;
  // eslint-disable-next-line react/no-unused-prop-types
  backgroundImgPath?: string;
  // eslint-disable-next-line react/no-unused-prop-types
  genre?: string;
  // eslint-disable-next-line react/no-unused-prop-types
  releaseDate?: number;
}

const singleStyle = {
  width: '280',
  height: '175',
};

function FilmCard({ title, imgPath }: FilmCardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={imgPath} alt={title} style={singleStyle} />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">
          {title}
        </a>
      </h3>
    </article>
  );
}

export default FilmCard;
