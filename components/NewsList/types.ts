export type NewsListProps = {
  list: {
    id: string;
    webTitle: string;
    fields: {
      thumbnail: string;
      trailText: string;
    };
    sectionName: string;
    webPublicationDate: string;
    description:string;
  }[];
};
