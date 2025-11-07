module Api
  module V1
    class VardiyalarController < ApplicationController
      # 🔹 Test için JWT doğrulamasını atla
      skip_before_action :authenticate_request, only: [:index, :show, :by_calisan]

      before_action :set_vardiya, only: [:show, :update, :destroy]

      # GET /api/v1/vardiyalar
      # filtre: ?tarih=YYYY-MM-DD
      def index
        vardiyalar = params[:tarih].present? ? Vardiya.where(tarih: params[:tarih]) : Vardiya.all
        render json: vardiyalar.as_json, status: :ok
      end

      # GET /api/v1/vardiyalar/:id
      def show
        render json: @vardiya.as_json, status: :ok
      end

      # POST /api/v1/vardiyalar
      def create
        vardiya = Vardiya.new(vardiya_params)
        if vardiya.save
          render json: vardiya.as_json, status: :created
        else
          render json: { errors: vardiya.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PUT/PATCH /api/v1/vardiyalar/:id
      def update
        if @vardiya.update(vardiya_params)
          render json: @vardiya.as_json, status: :ok
        else
          render json: { errors: @vardiya.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/vardiyalar/:id
      def destroy
        @vardiya.destroy
        head :no_content
      end

      # GET /api/v1/calisans/:calisan_id/vardiyalar
      def by_calisan
        calisan = Calisan.find_by(id: params[:calisan_id])
        if calisan
          render json: calisan.vardiyas.as_json, status: :ok
        else
          render json: { error: "Çalışan bulunamadı" }, status: :not_found
        end
      end

      private

      def set_vardiya
        @vardiya = Vardiya.find_by(id: params[:id])
        render json: { error: "Vardiya bulunamadı" }, status: :not_found unless @vardiya
      end

      def vardiya_params
        params.require(:vardiya).permit(:tarih, :baslangic, :bitis, :calisan_id)
      end
    end
  end
end
