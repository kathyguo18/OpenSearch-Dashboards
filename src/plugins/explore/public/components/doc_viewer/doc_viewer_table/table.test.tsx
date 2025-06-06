/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { mount } from 'enzyme';
import { findTestSubject } from 'test_utils/helpers';
import { DocViewTable } from './table';
import { indexPatterns, IndexPattern } from '../../../../../data/public';

const indexPattern = ({
  fields: {
    getAll: () => [
      {
        name: '_index',
        type: 'string',
        scripted: false,
        filterable: true,
      },
      {
        name: 'message',
        type: 'string',
        scripted: false,
        filterable: false,
      },
      {
        name: 'extension',
        type: 'string',
        scripted: false,
        filterable: true,
      },
      {
        name: 'bytes',
        type: 'number',
        scripted: false,
        filterable: true,
      },
      {
        name: 'scripted',
        type: 'number',
        scripted: true,
        filterable: false,
      },
    ],
  },
  metaFields: ['_index', '_score'],
  flattenHit: undefined,
  formatHit: jest.fn((hit) => hit._source),
} as unknown) as IndexPattern;

indexPattern.fields.getByName = (name: string) => {
  return indexPattern.fields.getAll().find((field) => field.name === name);
};

indexPattern.flattenHit = indexPatterns.flattenHitWrapper(indexPattern, indexPattern.metaFields);

describe('DocViewTable at Discover', () => {
  // At Discover's main view, all buttons are rendered
  // check for existence of action buttons and warnings

  const hit = {
    _index: 'logstash-2014.09.09',
    _type: 'doc',
    _id: 'id123',
    _score: 1,
    _source: {
      message:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. \
        Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus \
        et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, \
        ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. \
        Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, \
        rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. \
        Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. \
        Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut',
      extension: 'html',
      not_mapped: 'yes',
      bytes: 100,
      objectArray: [{ foo: true }],
      relatedContent: {
        test: 1,
      },
      scripted: 123,
      _underscore: 123,
    },
  };

  const props = {
    hit,
    columns: ['extension'],
    indexPattern,
    filter: jest.fn(),
    onAddColumn: jest.fn(),
    onRemoveColumn: jest.fn(),
  };
  const component = mount(<DocViewTable {...props} />);
  [
    {
      _property: '_index',
      addInclusiveFilterButton: true,
      collapseBtn: false,
      noMappingWarning: false,
      toggleColumnButton: true,
      underscoreWarning: false,
    },
    {
      _property: 'message',
      addInclusiveFilterButton: false,
      collapseBtn: true,
      noMappingWarning: false,
      toggleColumnButton: true,
      underscoreWarning: false,
    },
    {
      _property: '_underscore',
      addInclusiveFilterButton: false,
      collapseBtn: false,
      noMappingWarning: false,
      toggleColumnButton: true,
      underScoreWarning: true,
    },
    {
      _property: 'scripted',
      addInclusiveFilterButton: false,
      collapseBtn: false,
      noMappingWarning: false,
      toggleColumnButton: true,
      underScoreWarning: false,
    },
    {
      _property: 'not_mapped',
      addInclusiveFilterButton: false,
      collapseBtn: false,
      noMappingWarning: true,
      toggleColumnButton: true,
      underScoreWarning: false,
    },
  ].forEach((check) => {
    const rowComponent = findTestSubject(component, `tableDocViewRow-${check._property}`);

    it(`renders row for ${check._property}`, () => {
      expect(rowComponent.length).toBe(1);
    });

    ([
      'addInclusiveFilterButton',
      'collapseBtn',
      'toggleColumnButton',
      'underscoreWarning',
    ] as const).forEach((element) => {
      const elementExist = check[element];

      if (typeof elementExist === 'boolean') {
        const btn = findTestSubject(rowComponent, element);

        it(`renders ${element} for '${check._property}' correctly`, () => {
          const disabled = btn.length ? btn.props().disabled : true;
          const clickAble = btn.length && !disabled ? true : false;
          expect(clickAble).toBe(elementExist);
        });
      }
    });

    (['noMappingWarning'] as const).forEach((element) => {
      const elementExist = check[element];

      if (typeof elementExist === 'boolean') {
        const el = findTestSubject(rowComponent, element);

        it(`renders ${element} for '${check._property}' correctly`, () => {
          expect(el.length).toBe(elementExist ? 1 : 0);
        });
      }
    });
  });
});

describe('DocViewTable at Discover Doc', () => {
  const hit = {
    _index: 'logstash-2014.09.09',
    _score: 1,
    _type: 'doc',
    _id: 'id123',
    _source: {
      extension: 'html',
      not_mapped: 'yes',
    },
  };
  // here no action buttons are rendered
  const props = {
    hit,
    indexPattern,
  };
  const component = mount(<DocViewTable {...props} />);
  const foundLength = findTestSubject(component, 'addInclusiveFilterButton').length;

  it(`renders no action buttons`, () => {
    expect(foundLength).toBe(0);
  });
});

describe('DocViewTable at Discover Context', () => {
  // here no toggleColumnButtons  are rendered
  const hit = {
    _index: 'logstash-2014.09.09',
    _type: 'doc',
    _id: 'id123',
    _score: 1,
    _source: {
      message:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. \
        Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus \
        et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, \
        ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. \
        Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, \
        rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. \
        Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. \
        Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut',
    },
  };
  const props = {
    hit,
    columns: ['extension'],
    indexPattern,
    filter: jest.fn(),
  };

  const component = mount(<DocViewTable {...props} />);

  it(`renders no toggleColumnButton`, () => {
    const foundLength = findTestSubject(component, 'toggleColumnButtons').length;
    expect(foundLength).toBe(0);
  });

  it(`renders addInclusiveFilterButton`, () => {
    const row = findTestSubject(component, `tableDocViewRow-_index`);
    const btn = findTestSubject(row, 'addInclusiveFilterButton');
    expect(btn.length).toBe(1);
    btn.simulate('click');
    expect(props.filter).toBeCalled();
  });

  it(`renders functional collapse button`, () => {
    const btn = findTestSubject(component, `collapseBtn`);
    const html = component.html();

    expect(component.html()).toContain('truncate-by-height');

    expect(btn.length).toBe(1);
    btn.simulate('click');
    expect(component.html() !== html).toBeTruthy();
  });
});
