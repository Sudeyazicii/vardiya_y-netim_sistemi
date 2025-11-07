# app/controllers/api/v1/sessions_controller.rb
module Api
  module V1
    class SessionsController < ApplicationController
      skip_before_action :authenticate_request, only: [:create]

      def create
        email = params[:email]
        password = params[:password]

        calisan = Calisan.find_by(email: email)

        if calisan&.authenticate(password)
          token = JsonWebToken.encode(calisan_id: calisan.id)
          render json: { token: token, calisan: calisan.as_json(except: [:password_digest]) }, status: :ok
        else
          render json: { error: "Email veya şifre hatalı" }, status: :unauthorized
        end
      end
    end
  end
end
