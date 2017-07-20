import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, TestBed, getTestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';

describe('emoji validation', () => {
  it('should return true if string contains at least one alphanumeric char', () => {
    const text = `⌚ d`;
    const regex = /\w/;
    const alphanumericMatch = regex.test(text);
    expect(alphanumericMatch).toBeTruthy();
  });
  it('should return false if string contains only emoji', () => {
    const text = `⌚`;
    const regex = /\w/;
    const alphanumericMatch = regex.test(text);
    expect(alphanumericMatch).toBeFalsy();
  });
  it('should return false if string contains two emojis without text', () => {
    const text = '💯🏑';
    const regex = /\w/;
    const alphanumericMatch = regex.test(text);
    expect(alphanumericMatch).toBeFalsy();
  });
});
