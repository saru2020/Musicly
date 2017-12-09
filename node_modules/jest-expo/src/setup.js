/**
 * Adds Expo-related mocks to the Jest environment. Jest runs this setup module
 * after it runs the React Native setup module.
 */
'use strict';

const { Response, Request, Headers, fetch } = require('whatwg-fetch');
global.Response = Response;
global.Request = Request;
global.Headers = Headers;
global.fetch = fetch;

const mockNativeModules = require('react-native/Libraries/BatchedBridge/NativeModules');

const createMockConstants = require('./createMockConstants');

// window isn't defined as of react-native 0.45+ it seems
if (typeof window !== 'object') {
  global.window = global;
  global.window.navigator = {};
}

const mockImageLoader = {
  configurable: true,
  enumerable: true,
  get: () => ({
    prefetchImage: jest.fn(),
    getSize: jest.fn((uri, success) =>
      process.nextTick(() => success(320, 240))
    ),
  }),
};
Object.defineProperty(mockNativeModules, 'ImageLoader', mockImageLoader);
Object.defineProperty(mockNativeModules, 'ImageViewManager', mockImageLoader);

const expoModules = require('./expoModules');
const expoModuleCustomMocks = {
  ExponentConstants: createMockConstants(),
  ExponentFileSystem: {
    downloadAsync: jest.fn(() => Promise.resolve({ md5: 'md5', uri: 'uri' })),
    getInfoAsync: jest.fn(() =>
      Promise.resolve({ exists: true, md5: 'md5', uri: 'uri' })
    ),
  },
  ExponentFontLoader: {
    loadAsync: jest.fn(() => Promise.resolve()),
  },
};

for (let moduleName of Object.keys(expoModules)) {
  const moduleProperties = expoModules[moduleName];
  const mockedProperties = {};

  for (let propertyName of Object.keys(moduleProperties)) {
    const property = moduleProperties[propertyName];
    const propertyType = property.type;
    const customMock =
      (expoModuleCustomMocks[moduleName] &&
        expoModuleCustomMocks[moduleName][propertyName]) ||
      property.mock;

    let mockValue;
    if (customMock) {
      mockValue = customMock;
    } else if (propertyType === 'function') {
      if (property.functionType === 'promise') {
        mockValue = jest.fn(() => Promise.resolve());
      } else {
        mockValue = jest.fn();
      }
    } else if (propertyType === 'number') {
      mockValue = 1;
    } else if (propertyType === 'string') {
      mockValue = 'mock';
    } else if (propertyType === 'array') {
      mockValue = [];
    } else {
      mockValue = {};
    }

    mockedProperties[propertyName] = mockValue;
  }

  Object.defineProperty(mockNativeModules, moduleName, {
    configurable: true,
    enumerable: true,
    get: () => mockedProperties,
  });
}

jest.mock('react-native/Libraries/Image/AssetRegistry', () => ({
  registerAsset: jest.fn(() => 1),
  getAssetByID: jest.fn(() => ({
    scales: [1],
    fileHashes: ['md5'],
    name: 'name',
    exists: true,
    type: 'type',
    hash: 'md5',
    uri: 'uri',
    width: 1,
    height: 1,
  })),
}));

jest.doMock(
  'react-native/Libraries/BatchedBridge/NativeModules',
  () => mockNativeModules
);

/* Use React Native Modal component for tests */
const ReactNative = require.requireActual('react-native');
const Modal = ReactNative.Modal;
const Expo = require.requireActual('expo');

Object.defineProperty(Expo, 'Modal', {
  enumerable: true,
  get: () => Modal,
});
Object.defineProperty(ReactNative, 'Modal', {
  enumerable: true,
  get: () => Modal,
});
