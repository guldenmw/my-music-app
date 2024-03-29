import React, {FC} from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import IMusicBrainzRelease from '../../core/store/search/musicbrainz/types/MusicBrainzReleasesResults';
import ReleaseItem from '../ReleaseItem';
import { mapStateToProps } from './container';


interface IProps {
  artistId: string;
  releases: IMusicBrainzRelease[];
  isLoading?: string[];
}


const ReleasesTable: FC<IProps> = (props) => {
  const {
    artistId,
    releases,
    isLoading
  } = props;

  const isLoadingByArtist = isLoading.some(item => item === artistId);

  const tableLoadingBody = (
    <tr>
      <td colSpan={2}>
        <span>Loading...</span>
      </td>
    </tr>
  );

  return (
    <tr>
      <td colSpan={3}>
        <Table responsive hover size='md'>
          <thead>
            <tr>
              <th className='table-button-header'/>
              <th>Year</th>
              <th>Title</th>
              <th>Release Label</th>
              <th>Tracks</th>
            </tr>
          </thead>
          <tbody>
          {isLoadingByArtist ? (
            tableLoadingBody
          ) : (
            releases.map((release, index) => (
              <ReleaseItem key={index} item={release}/>
            ))
          )}

          </tbody>
        </Table>
      </td>
    </tr>
  )
};

export default connect(
  mapStateToProps,
  null
)(ReleasesTable) as typeof ReleasesTable;