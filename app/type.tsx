
export type News={
    id: string;
    webTitle: string;
    fields: {
      thumbnail: string;
      trailText: string;
      body: string;
    };
    sectionName: string;
    webPublicationDate: string;
}


export type NewsDetailProps = {
  news: {
    id: string;
    webTitle: string;
    fields: {
      thumbnail: string;
      trailText: string;
      body: string;
    };
    sectionName: string;
    webPublicationDate: string;
  };
};

export type NewsListProps = {
  list: {
    id: string;
    webTitle: string;
    fields: {
      thumbnail: string;
      trailText: string;
      body: string;

    };
    sectionName: string;
    webPublicationDate: string;
    description:string;
  }[];
};