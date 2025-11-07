module Api
  module V1
    class DepartmanlarController < ApplicationController
      # 🔹 Test için JWT doğrulamasını atla
      skip_before_action :authenticate_request, only: [:index, :show, :calisans]

      before_action :set_departman, only: [:show, :update, :destroy, :calisans]

      # GET /api/v1/departmanlar
      def index
        departmanlar = Departman.all
        render json: departmanlar.as_json, status: :ok
      end

      # GET /api/v1/departmanlar/:id
      def show
        render json: @departman.as_json, status: :ok
      end

      # POST /api/v1/departmanlar
      def create
        departman = Departman.new(departman_params)
        if departman.save
          render json: departman.as_json, status: :created
        else
          render json: { errors: departman.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PUT/PATCH /api/v1/departmanlar/:id
      def update
        if @departman.update(departman_params)
          render json: @departman.as_json, status: :ok
        else
          render json: { errors: @departman.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/departmanlar/:id
      def destroy
        @departman.destroy
        head :no_content
      end

      # GET /api/v1/departmanlar/:id/calisans
      def calisans
        render json: @departman.calisans.as_json(except: [:password_digest]), status: :ok
      end

      private

      def set_departman
        @departman = Departman.find_by(id: params[:id])
        render json: { error: "Departman bulunamadı" }, status: :not_found unless @departman
      end

      def departman_params
        params.require(:departman).permit(:ad)
      end
    end
  end
end
