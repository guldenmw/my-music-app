import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps, mapStateToProps } from './container';

import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

import SearchBar from "../../components/SearchBar";
import ArtistItem from '../../components/ArtistItem'
import EmptyTable from "../../components/EmptyTable";
import Shortlist from "../../components/Shortlist";

import ILastFMArtist from '../../core/store/search/lastfm/types/LastFMArtistsResults';


interface IProps {
  isLoading?: boolean;
  results?: ILastFMArtist[];
  searchText?: string;
  searchTextChange?: (...args) => void;
  startSearch?: (searchText: string) => void;
}

const SearchArtists: FC<IProps> = (props) => {
  const {
    isLoading,
    results,
    searchText,
    searchTextChange,
    startSearch
  } = props;

  const [showShortlist, setShortlistVisible] = useState(false);

  const handleSearchStart = (event?: any) => {
    startSearch(searchText);
  };

  const tableLoadingBody = (
    <tbody>
    <tr>
      <td colSpan={2}>
        <span>Loading...</span>
      </td>
    </tr>
    </tbody>
  );

  const showEmptyTable = !results || (results.length < 1 && !isLoading);

  return (
    <Container>
      <Row>
        <Col>
          <h2>Search Artists</h2>
        </Col>
      </Row>

      <SearchBar
        onClick={handleSearchStart}
        onChange={searchTextChange}
        value={searchText}
      />

      <Col className="d-flex justify-content-end">
        <Button onClick={() => setShortlistVisible(!showShortlist)}>Show Shortlist</Button>
      </Col>

      {showShortlist && (
        <Shortlist />
      )}

      { showEmptyTable && (
        <EmptyTable message={'Try searching for something'} icon={faExclamation}/>
      )}

      {!showEmptyTable && (
        <Col>
          <h1>Search Results:</h1>

          <Table responsive size='md'>
            <thead>
              <tr>
                <th/>
                <th>Artist Name</th>
                <th/>
              </tr>
            </thead>
            {isLoading ? (tableLoadingBody) : (
              <tbody>
                {results.map((item, index) => (
                  <ArtistItem
                    key={index}
                    item={item}
                  />
                ))}
              </tbody>
            )}
          </Table>
        </Col>
      )}
    </Container>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchArtists) as typeof SearchArtists;
