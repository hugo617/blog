class ApplicationService
  def self.call(*args, **kwargs)
    new(*args, **kwargs).call
  end

  def call
    raise NotImplementedError, "#{self.class} must implement #call"
  end

  private

  def success(data = nil)
    ServiceResult.new(success: true, data: data)
  end

  def failure(error)
    ServiceResult.new(success: false, error: error)
  end
end

class ServiceResult
  attr_reader :data, :error

  def initialize(success:, data: nil, error: nil)
    @success = success
    @data = data
    @error = error
  end

  def success?
    @success
  end

  def failure?
    !@success
  end
end
