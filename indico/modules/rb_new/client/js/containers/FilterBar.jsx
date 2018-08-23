/* This file is part of Indico.
 * Copyright (C) 2002 - 2018 European Organization for Nuclear Research (CERN).
 *
 * Indico is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 3 of the
 * License, or (at your option) any later version.
 *
 * Indico is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Indico; if not, see <http://www.gnu.org/licenses/>.
 */
import {connect} from 'react-redux';
import {setFilterParameter, fetchRooms, fetchMapRooms, fetchBlockings} from '../actions';
import * as selectors from '../selectors';
import {selectors as userSelectors} from '../common/user';


export default (namespace, componentClass) => {
    const mapStateToProps = state => ({
        equipmentTypes: selectors.getEquipmentTypes(state),
        ...state[namespace].filters,
        hasOwnedRooms: userSelectors.hasOwnedRooms(state),
        hasFavoriteRooms: userSelectors.hasFavoriteRooms(state),
        namespace
    });

    const mapDispatchToProps = dispatch => ({
        setFilterParameter: (param, value) => {
            dispatch(setFilterParameter(namespace, param, value));
            if (namespace === 'blockingList') {
                dispatch(fetchBlockings());
            } else {
                dispatch(fetchRooms(namespace));
                dispatch(fetchMapRooms(namespace));
            }
        }
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(componentClass);
};
