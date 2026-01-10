import React from "react";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import Swal from "sweetalert2";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Contact form data:", data);
    
    Swal.fire({
      title: "Message Sent!",
      text: "Thank you for contacting us. We'll get back to you soon!",
      icon: "success",
      confirmButtonColor: "#10b981",
    });
    
    reset();
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <title>Contact Us - Chef Lokal</title>
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-gray-400 text-lg">
            Have questions? We'd love to hear from you. Send us a message!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <p className="text-gray-400 mb-8">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="bg-base-200 p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-gray-400">Mon-Fri from 10am to 10pm</p>
                    <a
                      href="tel:+8801234567890"
                      className="text-orange-500 hover:text-orange-600 font-semibold mt-2 block"
                    >
                      +880 1234 567 890
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-base-200 p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-gray-400">We'll respond within 24 hours</p>
                    <a
                      href="mailto:contact@cheflokal.com"
                      className="text-orange-500 hover:text-orange-600 font-semibold mt-2 block"
                    >
                      contact@cheflokal.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-base-200 p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Location</h3>
                    <p className="text-gray-400">Visit our office</p>
                    <p className="text-white font-semibold mt-2">
                      House 42, Road 11, Block E<br />
                      Gulshan-1, Dhaka 1212<br />
                      Bangladesh
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-base-200 p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Working Hours</h3>
                    <div className="text-gray-400 mt-2 space-y-1">
                      <p>Monday - Friday: 10:00 AM - 10:00 PM</p>
                      <p>Saturday - Sunday: 11:00 AM - 11:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-base-200 p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Your Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className="input input-bordered w-full"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Email Address</span>
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="input input-bordered w-full"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Phone Number</span>
                </label>
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9+\-\s()]+$/,
                      message: "Invalid phone number",
                    },
                  })}
                  className="input input-bordered w-full"
                  placeholder="+880 1234 567 890"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Subject</span>
                </label>
                <input
                  type="text"
                  {...register("subject", {
                    required: "Subject is required",
                  })}
                  className="input input-bordered w-full"
                  placeholder="How can we help you?"
                />
                {errors.subject && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.subject.message}
                  </span>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Message</span>
                </label>
                <textarea
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                  className="textarea textarea-bordered w-full h-32"
                  placeholder="Tell us more about your inquiry..."
                />
                {errors.message && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full text-white text-lg gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Find Us Here</h2>
          <div className="rounded-2xl overflow-hidden shadow-2xl h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.5890431772664!2d90.41156431498145!3d23.780725484576476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a1f3f3f3f3%3A0x3f3f3f3f3f3f3f3f!2sGulshan%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Chef Lokal Location"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;