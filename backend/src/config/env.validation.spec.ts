import { envValidationSchema } from './env.validation';

describe('envValidationSchema', () => {
  it('applies defaults when no environment variables are provided', () => {
    const { error, value } = envValidationSchema.validate({});

    expect(error).toBeUndefined();
    expect(value.PORT).toBe(3100);
    expect(value.FRONTEND_ORIGIN).toBe('http://localhost:3000');
  });

  it('fails validation when PORT is not a valid number', () => {
    const { error } = envValidationSchema.validate({ PORT: 'not-a-number' });

    expect(error).toBeDefined();
  });

  it('accepts explicit valid overrides', () => {
    const { error, value } = envValidationSchema.validate({
      PORT: '4000',
      FRONTEND_ORIGIN: 'http://example.com',
    });

    expect(error).toBeUndefined();
    expect(value.PORT).toBe(4000);
    expect(value.FRONTEND_ORIGIN).toBe('http://example.com');
  });
});
