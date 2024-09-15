import { describe, expect, it } from "vitest";

import { formDataToJson } from "./formDataToJson";

describe("Test form data to json util", () => {
  it("should convert a given form data with some object with props", () => {
    const formData = new FormData();

    const formFields = {
      "user[email]": "foo@bar.baz",
      "user[gender]": "Male",
      "user[name]": "Foo Bar",
      "user[password]": "123456",
    };

    for (const key in formFields) {
      formData.append(key, formFields[key as keyof typeof formFields]);
    }

    const jsonFormData = formDataToJson(formData);

    expect(jsonFormData).toMatchObject({
      user: {
        gender: "Male",
        name: "Foo Bar",
        password: "123456",
        email: "foo@bar.baz",
      },
    });
  });

  it("should convert a given form data with an array of objects with props", () => {
    const formData = new FormData();

    const formFields = {
      "user[email]": "foo@bar.baz",
      "user[password]": "123456",
      "user[phones][]": "+24494556789",
      "user[addresses][0][name]": "Home",
      "user[addresses][0][city]": "Luanda",
      "user[addresses][0][country]": "Angola",
      "user[addresses][0][otherCountries][0]": "França",
      "user[addresses][0][otherCountries][1]": "Moçambique",
      "user[addresses][0][otherCountries][2]": "Brasil",
      "user[addresses][0][otherCountries][3]": "Portugal",
      "user[addresses][0][otherCountries][4]": "Cabo Verde",
    };

    for (const key in formFields) {
      formData.append(key, formFields[key as keyof typeof formFields]);
    }

    const jsonFormData = formDataToJson(formData);

    expect(jsonFormData).toMatchObject({
      user: {
        email: "foo@bar.baz",
        password: "123456",
        phones: ["+24494556789"],
        addresses: [
          {
            name: "Home",
            city: "Luanda",
            country: "Angola",
            otherCountries: [
              "França",
              "Moçambique",
              "Brasil",
              "Portugal",
              "Cabo Verde",
            ],
          },
        ],
      },
    });
  });

  it("should convert a given form data with a single array of strings with explicit indexes", () => {
    const formData = new FormData();

    formData.append("user[email]", "foo@bar.baz");
    formData.append("user[password]", "123456");
    formData.append("user[addresses][0]", "Home");
    formData.append("user[addresses][1]", "Work");
    formData.append("user[addresses][2]", "School");

    const jsonFormData = formDataToJson(formData);

    expect(jsonFormData).toMatchObject({
      user: {
        email: "foo@bar.baz",
        password: "123456",
        addresses: ["Home", "Work", "School"],
      },
    });
  });

  it("should convert a given form data with a single array of strings with explicit indexes having nested arrays of objects with implicit indexes", () => {
    const formData = new FormData();

    formData.append("user[email]", "foo@bar.baz");
    formData.append("user[password]", "123456");
    formData.append("user[addresses][0]", "Home");
    formData.append("user[addresses][1]", "Work");
    formData.append("user[addresses][2]", "School");
    formData.append("user[apps][0][name]", "Facebook");
    formData.append("user[apps][0][url]", "https://www.facebook.com");
    formData.append("user[apps][0][keywords][]", "Facebook");
    formData.append("user[apps][0][keywords][]", "Social Media");
    formData.append("user[apps][0][keywords][]", "FB");
    formData.append("user[apps][0][keywords][]", "Meta");
    formData.append("user[apps][0][keywords][]", "Meta Ads");
    formData.append("user[apps][0][keywords][]", "Meta Verse");
    formData.append("user[apps][1][name]", "Instagram");
    formData.append("user[apps][1][url]", "https://www.instagram.com");
    formData.append("user[apps][1][keywords][]", "Insta");
    formData.append("user[apps][1][keywords][]", "IG");
    formData.append("user[apps][1][keywords][]", "Social network");
    formData.append("user[apps][1][keywords][]", "Photos");
    formData.append("user[apps][1][keywords][]", "Videos");
    formData.append("user[apps][1][keywords][]", "Short videos");
    formData.append("user[apps][1][keywords][]", "Reels");
    formData.append("user[apps][1][keywords][]", "Stories");

    const jsonFormData = formDataToJson(formData);

    expect(jsonFormData).toMatchInlineSnapshot(`
      {
        "user": {
          "addresses": [
            "Home",
            "Work",
            "School",
          ],
          "apps": [
            {
              "keywords": [
                "Facebook",
                "Social Media",
                "FB",
                "Meta",
                "Meta Ads",
                "Meta Verse",
              ],
              "name": "Facebook",
              "url": "https://www.facebook.com",
            },
            {
              "keywords": [
                "Videos",
                "Short videos",
                "Reels",
                "Stories",
                "Insta",
                "IG",
                "Social network",
                "Photos",
              ],
              "name": "Instagram",
              "url": "https://www.instagram.com",
            },
          ],
          "email": "foo@bar.baz",
          "password": "123456",
        },
      }
    `);
  });

  it("should convert a given form data with a single array of strings with implicit indexes", () => {
    const formData = new FormData();

    formData.append("user[email]", "foo@bar.baz");
    formData.append("user[password]", "123456");
    formData.append("user[addresses][]", "Home");
    formData.append("user[addresses][]", "Work");
    formData.append("user[addresses][]", "School");

    const jsonFormData = formDataToJson(formData);

    expect(jsonFormData).toMatchObject({
      user: {
        email: "foo@bar.baz",
        password: "123456",
        addresses: ["Home", "Work", "School"],
      },
    });
  });

  it("should convert a given form data with a single array of objects with implicit indexes", () => {
    const formData = new FormData();

    formData.append("user[email]", "foo@bar.baz");
    formData.append("user[password]", "123456");
    formData.append("user[addresses][][alias]", "Home");
    formData.append("user[addresses][][alias]", "Work");
    formData.append("user[addresses][][alias]", "School");

    const jsonFormData = formDataToJson(formData);

    expect(jsonFormData).toMatchObject({
      user: {
        email: "foo@bar.baz",
        password: "123456",
        addresses: [
          {
            alias: "Home",
          },
          {
            alias: "Work",
          },
          {
            alias: "School",
          },
        ],
      },
    });
  });
});
