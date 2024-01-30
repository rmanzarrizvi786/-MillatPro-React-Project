import React from "react";
import "./contactForm.css";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import emailjs from '@emailjs/browser';

import { useFormik } from "formik";
import * as Yup from "yup";

const ContactForm = () => {


  const formikk = useFormik({
    initialValues: {
      fname: "",
      phone_num: "",
      e_mail: "",
      subject: "",
      message_text: "",
    },
    onSubmit: (values) => {
      emailjs.send('service_ca1z7p4', 'template_ilz5nod', values , 'pOLatEUyPSRq7E81I')
        .then((result) => {
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
      formikk.handleReset(values)

    },
    validationSchema: Yup.object({
      fname: Yup.string()
        .min(3, "Name must be between 3 to 30 charachters")
        .max(30, "Name must be between 3 to 30 charachters")
        .required("Required Field"),
      e_mail: Yup.string()
        .email("Please enter a valid e-mail")
        .required("Required Field"),
      subject: Yup.string().required("Required Field"),
      message_text: Yup.string().required("Required Field"),
      phone_num: Yup.string().required("Required Field")
    }),
  });

  return (
    <>
      <div className="content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-11">
              <div className="row align-items-center">
                <div className="col-lg-7 mb-5 mb-lg-0">
                  <h2 className="mb-5 headings_form">
                    Fill the form. <br /> To Share Your Thoughts
                  </h2>
                  <form
                    className="border-right pr-5 mb-5"
                    method="post"
                    id="contactForm"
                    name="contactForm"
                    onSubmit={formikk.handleSubmit}
                  >
                    <div className="row">
                      {" "}
                      {/*full name*/}
                      <div className="col-md-6 form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="fname"
                          id="fname"
                          placeholder="Full name"
                          value={formikk.values.fname}
                          onChange={formikk.handleChange}
                          onBlur={formikk.handleBlur}
                        />
                        {formikk.errors.fname && formikk.touched.fname && (
                          <p style={{ color: "red", fontSize: "11px" }}>
                            {formikk.errors.fname}
                          </p>
                        )}
                      </div>
                      <div className="col-md-6 form-group">
                        {/* <PhoneInput
                        type='tel'
                          inputProps={{
                            required: true,
                          }}
                          className="form-control"
                          name="phone_num"
                          id="phone_num"
                          country={"pk"}
                          placeholder="300-1234567"
                          value={formikk.values.phone_num}
                          onChange={formikk.handleChange}
                          onBlur={formikk.handleBlur}
                        /> */}
                        <input
                          type="tel"
                          className="form-control"
                          name="phone_num"
                          id="phone_num"
                          placeholder="Phone Number"
                          value={formikk.values.phone_num}
                          onChange={formikk.handleChange}
                          onBlur={formikk.handleBlur}
                        />
                        {formikk.errors.phone_num &&
                          formikk.touched.phone_num && (
                            <p style={{ color: "red", fontSize: "11px" }}>
                              {formikk.errors.phone_num}
                            </p>
                          )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 form-group">
                        {/*email*/}
                        <input
                          type="email"
                          className="form-control"
                          name="e_mail"
                          id="e_mail"
                          placeholder="Email"
                          value={formikk.values.e_mail}
                          onChange={formikk.handleChange}
                          onBlur={formikk.handleBlur}
                        />
                        {formikk.errors.e_mail && formikk.touched.e_mail && (
                          <p style={{ color: "red", fontSize: "11px" }}>
                            {formikk.errors.e_mail}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 form-group">
                        {/*subject*/}
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          id="subject"
                          placeholder="subject"
                          value={formikk.values.subject}
                          onChange={formikk.handleChange}
                          onBlur={formikk.handleBlur}
                        />
                        {formikk.errors.subject && formikk.touched.subject && (
                          <p style={{ color: "red", fontSize: "11px" }}>
                            {formikk.errors.subject}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 my-2 form-group">
                        {" "}
                        {/*message*/}
                        <textarea
                          className="form-control text_area"
                          name="message_text"
                          id="message_text"
                          cols="30"
                          rows="7"
                          placeholder="Write your message"
                          value={formikk.values.message_text}
                          onChange={formikk.handleChange}
                          onBlur={formikk.handleBlur}
                        ></textarea>
                        {formikk.errors.message_text &&
                          formikk.touched.message_text && (
                            <p style={{ color: "red", fontSize: "11px" }}>
                              {formikk.errors.message_text}
                            </p>
                          )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 my-3">
                        <input
                          type="submit"
                          value="Send Message"
                          className=" btn btn-primary rounded-0 py-1 px-4"
                        />
                        <span className="submitting"></span>
                      </div>
                    </div>
                  </form>
                  <div id="form-message-warning mt-4"></div>
                </div>
                <div className="col-lg-4 ml-auto">
                  <h3 className="mb-4 headings_form">Let's talk about everything.</h3>
                  {/* <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nihil deleniti itaque similique magni. Magni, laboriosam
                    perferendis maxime!
                  </p> */}
                  {/* <p><a href="#">Read more</a></p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
