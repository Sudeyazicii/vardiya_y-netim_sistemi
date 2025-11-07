# app/controllers/api/v1/calisans_controller.rb
module Api
  module V1
    class CalisansController < ApplicationController
      # 🔹 Test için JWT doğrulamasını atla
      skip_before_action :authenticate_request, only: [:index, :show]

      before_action :set_calisan, only: [:show, :update, :destroy, :vardiyalar]

      # GET /api/v1/calisans
      def index
  calisans = Calisan.all
  render json: calisans.as_json(except: [:password_digest]), status: :ok
end


      # GET /api/v1/calisans/:id
      def show
        render json: @calisan.as_json(except: [:password_digest]), status: :ok
      end

      # POST /api/v1/calisans
      def create
        calisan = Calisan.new(calisan_params)
        if calisan.save
          render json: calisan.as_json(except: [:password_digest]), status: :created
        else
          render json: { errors: calisan.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PUT/PATCH /api/v1/calisans/:id
      def update
        if @calisan.update(calisan_params)
          render json: @calisan.as_json(except: [:password_digest]), status: :ok
        else
          render json: { errors: @calisan.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/calisans/:id
      def destroy
        @calisan.destroy
        head :no_content
      end

      # GET /api/v1/calisans/:id/vardiyalar
      def vardiyalar
        render json: @calisan.vardiyas.as_json, status: :ok
      end

      private

      def set_calisan
        @calisan = Calisan.find_by(id: params[:id])
        render json: { error: "Çalışan bulunamadı" }, status: :not_found unless @calisan
      end

      def calisan_params
        params.require(:calisan).permit(:ad, :soyad, :email, :departman_id, :password, :password_confirmation)
      end
    end
  end
end
